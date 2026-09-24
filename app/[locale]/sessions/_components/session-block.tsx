import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Flex align="center" gap="1" justify="space-between">
            <Text fontWeight="medium" color="var(--text-primary)" truncate>
              {session.title}
            </Text>
            <Box flexShrink="0">
              <Badge variant="secondary">
                {session.level.charAt(0).toUpperCase() + session.level.slice(1)}
              </Badge>
            </Box>
          </Flex>
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
