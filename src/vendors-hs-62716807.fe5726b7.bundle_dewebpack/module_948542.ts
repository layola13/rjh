import { fixToStringTag } from './fix-to-string-tag';
import { defineProperty } from './define-property';
import { toStringTagSupport } from './to-string-tag-support';

if (!toStringTagSupport) {
  defineProperty(Object.prototype, "toString", fixToStringTag, {
    unsafe: true
  });
}