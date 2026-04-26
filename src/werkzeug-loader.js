let werkzeugeModulePromise = null;

function preloadWerkzeugeTools() {
  if (!werkzeugeModulePromise) {
    werkzeugeModulePromise = import('./werkzeuge-tools.jsx');
  }

  return werkzeugeModulePromise;
}

async function loadWerkzeugTool(tool) {
  const module = await preloadWerkzeugeTools();
  const Tool = module.TOOL_COMPONENTS[tool];

  if (!Tool) {
    throw new Error(`Unknown werkzeug tool: ${tool}`);
  }

  return Tool;
}

function preloadWerkzeugTool(tool) {
  return preloadWerkzeugeTools().then((module) => module.TOOL_COMPONENTS[tool] || null);
}

export { loadWerkzeugTool, preloadWerkzeugTool, preloadWerkzeugeTools };
