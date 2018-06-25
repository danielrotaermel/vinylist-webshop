import { Component, EventEmitter } from '@angular/core';

/**
 * Use this MockComponent to mock components in tests where you don't want to test them (again)
 * Usage:
 * Import MockComponent in your test via `import { MockComponent } from '../helpers/mock-component';`
 * Add the MockComponent to the "declarations" (e.g `MockComponent({ selector: 'app-language-switcher' })`)
 *
 * To view an example, just take a look at the navigation-bar
 */
export function MockComponent(options: Component): Component {

  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  metadata.outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Component(metadata)(Mock as any);
}
