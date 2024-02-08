import { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Link from "next/link";
import { parseLink } from "./parseLink";
import Image from "next/image";

// eslint-disable-next-line no-use-before-define
export type Children = Leaf[];

export type Leaf = {
  type: string;
  textAlign?: "left" | "center" | "right";
  value?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  children?: Children;
  url?: string;
  [key: string]: unknown;
};

export const serialise = (
  children: Children,
  inline?: boolean
): React.ReactElement[] =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={i}>
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) return <></>;

    const props = {
      style: {
        textAlign: node.textAlign,
      },
      key: i,
    }

    switch (node.type) {
      case "h1":
        return <h1 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h1>;
      case "h2":
        return <h2 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h2>;
      case "h3":
        return <h3 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h3>;
      case "h4":
        return <h4 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h4>;
      case "h5":
        return <h5 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h5>;
      case "h6":
        return <h6 style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</h6>;
      case "blockquote":
        return (
          <blockquote style={{ textAlign: node.textAlign }} key={i}>
            {serialise(node.children as Children)}
          </blockquote>
        );
      case "ul":
        return <ul style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</ul>;
      case "ol":
        return <ol style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</ol>;
      case "li":
        return <li style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</li>;
      case "link":
        return (
          <Link
            href={escapeHTML(parseLink(node))}
            // @ts-expect-error
            className={node?.fields?.appearance || ""}
            style={{ textAlign: node.textAlign }} key={i}
          >
            {serialise(node.children as Children)}
          </Link>
        );
      case "upload":
        return (
          <Image
            src={node?.value?.url as string}
            alt={node?.value?.alt as string}
            width={node?.value?.width as number}
            height={node?.value?.height as number}
            key={i}
          />
        );
      default:
        return <p style={{ textAlign: node.textAlign }} key={i}>{serialise(node.children as Children)}</p>;
    }
  });
