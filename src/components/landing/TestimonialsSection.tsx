"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Avatar,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    company: "TechFlow Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "TrueMailer's accuracy is incredible. We've reduced our fake signup rate by 95% and improved our email deliverability significantly.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Growth",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The API is blazing fast and the documentation is excellent. Integration took less than an hour. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "DataDriven Co.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The real-time updates and comprehensive domain coverage give us confidence in our user validation process.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Engineering Lead",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Enterprise-grade security with SOC 2 compliance. Perfect for our compliance requirements and peace of mind.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Founder",
    company: "GrowthHackers",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    content: "The free tier got us started, and the Pro plan scaled perfectly with our growth. Excellent value for money.",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    role: "DevOps Engineer",
    company: "CloudScale",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Global CDN ensures consistent performance worldwide. We've seen sub-100ms response times across all regions.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
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
              Trusted by Developers Worldwide
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="3xl"
              mx="auto"
            >
              See what our customers say about TrueMailer
            </Text>
          </MotionBox>

          {/* Testimonials Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {testimonials.map((testimonial, index) => (
              <MotionCard
                key={testimonial.name}
                bg="gray.50"
                border="none"
                shadow="lg"
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
                <CardBody p={6}>
                  <Box display="flex" flexDirection="column" gap={4} h="full">
                    {/* Quote Icon */}
                    <Icon as={Quote} w={8} h={8} color="blue.500" opacity={0.3} />

                    {/* Rating */}
                    <Flex gap={1}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon
                          key={i}
                          as={Star}
                          w={4}
                          h={4}
                          color="yellow.400"
                          fill="yellow.400"
                        />
                      ))}
                    </Flex>

                    {/* Testimonial Content */}
                    <Text
                      color="gray.700"
                      lineHeight="1.6"
                      flex="1"
                      fontSize="sm"
                    >
                      "{testimonial.content}"
                    </Text>

                    {/* Author Info */}
                    <Flex align="center" gap={3} w="full">
                      <Avatar
                        size="md"
                        src={testimonial.avatar}
                        name={testimonial.name}
                      />
                      <Box display="flex" flexDirection="column" gap={0} flex="1">
                        <Text
                          fontWeight="semibold"
                          fontSize="sm"
                          color="gray.900"
                        >
                          {testimonial.name}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.600"
                        >
                          {testimonial.role}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                        >
                          {testimonial.company}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* Stats */}
          <MotionBox
            w="full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              spacing={8}
              w="full"
              textAlign="center"
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="blue.500"
                >
                  10,000+
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  Happy Customers
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="green.500"
                >
                  99.9%
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  Uptime SLA
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="purple.500"
                >
                  50M+
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  Validations Served
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="orange.500"
                >
                  24/7
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  Support Available
                </Text>
              </Box>
            </SimpleGrid>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}