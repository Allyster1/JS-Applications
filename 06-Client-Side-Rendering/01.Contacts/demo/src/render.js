const templates = {};

export async function loadTemplate(name) {
  if (templates[name]) {
    return templates[name];
  }
  const url = `/templates/${name}.html`;

  const res = await fetch(url);
  const templateData = await res.text();

  templates[name] = templateData;

  return templateData;
}

export function renderTemplate(template, content) {
  return template.replace(/%%(.+?)%%/g, (match, name) => {
    return content[name];
  });
}
