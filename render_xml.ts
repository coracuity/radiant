/**
 * This module provides functions for rendering XML elements and documents to strings.
 * @module
 */

import { escape } from "@std/html";
import { stringifyAttributes } from "./render.ts";
import { VoidXMLElement, type XMLDocument, XMLElement } from "./xml.ts";

/**
 * Renders a void XML element as a string.
 *
 * @param element - The void XML element to render.
 * @returns The rendered XML string.
 */
export const renderVoidXMLElement = <T extends string, A extends Record<string, string>>(
  element: VoidXMLElement<T, A>,
) => {
  return `<${element.tag}${stringifyAttributes(element.attributes ?? {})}>`;
};

/**
 * Renders an XML element as a string.
 *
 * @param element - The XML element to render.
 * @returns The rendered XML element as a string.
 */
export const renderXMLElement = <T, A, C>(element: XMLElement<T, A, C>) => {
  let result = `<${element.tag}${stringifyAttributes(element.attributes ?? {})}>`;

  for (const child of element.children) {
    if (typeof child === "string") {
      result += escape(child);
    } else {
      result += renderElement(child);
    }
  }

  result += `</${element.tag}>`;
  return result;
};

export const renderElement = (tag: unknown): string => {
  if (tag instanceof XMLElement) {
    return renderXMLElement(tag);
  }

  if (tag instanceof VoidXMLElement) {
    return renderVoidXMLElement(tag);
  }

  // This should never happen
  return "UNREACHABLE";
};

/**
 * Renders an XML document as a string.
 *
 * @param doc - The XML document to render.
 * @returns The rendered XML document as a string.
 */
export const renderXMLDocument = (doc: XMLDocument) => {
  let result = `${doc.docType.tag}`;
  for (const child of doc.children) {
    result += renderElement(child);
  }
  return result;
};
