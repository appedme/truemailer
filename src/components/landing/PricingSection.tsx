"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "200 validations/month",
      "Basic email validation",
      "Disposable domain detection",
      "Community support",
      "Standard response time",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Best for growing businesses",
    features: [
      "10,000 validations/month",
      "Advanced validation features",
      "Priority support",
      "Custom allowlist/blocklist",
      "Detailed analytics",
      "API rate limiting: 100/min",
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "solid" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large-scale applications",
    features: [
      "Unlimited validations",
      "Dedicated infrastructure",
      "24/7 phone support",
      "Custom integrations",
      "SLA guarantees",
      "Advanced security features",
      "White-label solution",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <Box py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="7xl">
        <Box display="flex" flexDirection="column" gap={12}>
          {/* Section Header */}
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading
              size={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              mb={4}
              color="gray.900"
            >
              Simple, Transparent Pricing
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="3xl"
              mx="auto"
            >
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </Text>
          </MotionBox>

          {/* Pricing Cards */}
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            w="full"
          >
            {plans.map((plan, index) => (
              <MotionCard
                key={plan.name}
                position="relative"
                bg="white"
                shadow={plan.popular ? "2xl" : "lg"}
                border={plan.popular ? "2px solid" : "none"}
                borderColor={plan.popular ? "blue.500" : "transparent"}
                _hover={{
                  shadow: "xl",
                  transform: "translateY(-4px)",
                }}
                transition="all 0.3s"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <Box
                    position="absolute"
                    top="-4"
                    left="50%"
                    transform="translateX(-50%)"
                  >
                    <Badge
                      colorScheme="blue"
                      px={4}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Icon as={Star} w={3} h={3} />
                      Most Popular
                    </Badge>
                  </Box>
                )}

                <CardHeader textAlign="center" pb={2}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Heading
                      size="lg"
                      color="gray.900"
                    >
                      {plan.name}
                    </Heading>
                    <Flex align="baseline" gap={1}>
                      <Text
                        fontSize="4xl"
                        fontWeight="bold"
                        color="gray.900"
                      >
                        {plan.price}
                      </Text>
                      {plan.period !== "pricing" && (
                        <Text
                          fontSize="lg"
                          color="gray.600"
                        >
                          /{plan.period}
                        </Text>
                      )}
                    </Flex>
                    <Text
                      color="gray.600"
                      fontSize="sm"
                    >
                      {plan.description}
                    </Text>
                  </Box>
                </CardHeader>

                <CardBody pt={0}>
                  <Box display="flex" flexDirection="column" gap={6}>
                    <Box display="flex" flexDirection="column" gap={3} w="full">
                      {plan.features.map((feature, featureIndex) => (
                        <Flex key={featureIndex} align="center" gap={3}>
                          <Icon
                            as={Check}
                            color="green.500"
                            w={4}
                            h={4}
                            flexShrink={0}
                          />
                          <Text
                            fontSize="sm"
                            color="gray.700"
                          >
                            {feature}
                          </Text>
                        </Flex>
                      ))}
                    </Box>

                    <Button
                      colorScheme={plan.popular ? "blue" : "gray"}
                      variant={plan.buttonVariant}
                      size="lg"
                      w="full"
                      leftIcon={plan.popular ? <Zap size={16} /> : undefined}
                      _hover={{
                        transform: "translateY(-1px)",
                        shadow: "md",
                      }}
                      transition="all 0.2s"
                    >
                      {plan.buttonText}
                    </Button>
                  </Box>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* Additional Info */}
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Text
              color="gray.600"
              fontSize="sm"
              maxW="2xl"
              mx="auto"
            >
              All plans include our core features with 99.9% uptime SLA.
              No setup fees, no hidden costs. Cancel anytime.
            </Text>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}