export type TemplateConfig = {open: string, close: string};

declare function template(string: string, data: Object, config?: TemplateConfig): string

export default template;
