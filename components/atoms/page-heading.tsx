import { Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function PageHeading({
  title,
  children,
  lang,
}: {
  title: string;
  children?: ReactNode;
  /**
   * Set this to "en" only when `title`/`children` are hardcoded English copy
   * that hasn't been translated yet — it keeps that copy from being
   * misannounced on the `/es` locale (WCAG 3.1.2). Omit it once the caller
   * passes properly localized content. Tracked in issue #6.
   */
  lang?: string;
}) {
  return (
    <Flex direction="column" gap="2" lang={lang}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold">
        {title}
      </Heading>
      {children ? <Text color="var(--text-secondary)">{children}</Text> : null}
    </Flex>
  );
}
