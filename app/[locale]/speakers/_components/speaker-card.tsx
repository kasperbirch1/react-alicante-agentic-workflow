import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/utils/speakers";
import { Box, Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title}, ${session.startTime}`}
              >
                <Flex
                  direction="column"
                  _hover={{ textDecoration: "underline" }}
                  _focusVisible={{ textDecoration: "underline" }}
                >
                  <Text fontSize="sm" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  <Text color="var(--text-primary)">{session.title}</Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
