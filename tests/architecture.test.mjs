import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));

async function modules(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? modules(path) : /\.(?:js|jsx)$/.test(path) ? [path] : [];
  }))).flat();
}

test('frontend and backend layers keep their dependency boundaries', async () => {
  const allowedLayers = {
    domain: ['domain'],
    application: ['application', 'domain'],
    presentation: ['presentation', 'application', 'domain'],
    infrastructure: ['infrastructure', 'application', 'domain'],
  };
  for (const file of await modules(sourceRoot)) {
    const name = relative(sourceRoot, file);
    const source = await readFile(file, 'utf8');
    const imports = [...source.matchAll(/\bfrom\s+['"]([^'"]+)['"]|^import\s+['"]([^'"]+)['"]/gm)]
      .map((match) => match[1] || match[2]);
    const layer = name.startsWith('backend/contact/') ? name.split('/')[2] : null;
    if (['domain', 'application'].includes(layer)) {
      assert.doesNotMatch(source, /\b(?:fetch|process|Request|Response|window|document)\b/, `${name} must remain independent of runtime APIs`);
    }
    for (const dependency of imports) {
      if (!dependency.startsWith('.')) {
        if (['domain', 'application'].includes(layer)) assert.fail(`${name} cannot import ${dependency}`);
        continue;
      }
      const target = relative(sourceRoot, resolve(dirname(file), dependency));
      if (name.startsWith('frontend/')) assert.ok(target.startsWith('frontend/'), `${name} cannot import ${target}`);
      if (allowedLayers[layer]) {
        assert.ok(target.startsWith('backend/contact/'), `${name} cannot import ${target}`);
        assert.ok(allowedLayers[layer].includes(target.split('/')[2]), `${name} cannot depend on ${target}`);
      }
    }
  }
});
