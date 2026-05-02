import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Spinner,
  Flex,
  Avatar,
  Divider,
  Badge,
  IconButton,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { useTranslation } from "react-i18next";
import { getAIResponse } from "../services/aiService";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinance } from "../FinanceContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function AICoach() {
  const { t } = useTranslation();
  const { totalIncome, totalExpenses, transactions } = useFinance();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: `${t("muraho")} ${t("market_trends")}` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const businessContext = `The user has a total income of ${formatCurrency(totalIncome)} and total expenses of ${formatCurrency(totalExpenses)}. Number of transactions: ${transactions.length}. Recent categories: ${[...new Set(transactions.map(t => t.category))].join(", ")}`;

    const reply = await getAIResponse(newMessages, businessContext);

    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const assistantBg = "whiteAlpha.100";
  const userBg = "brand.500";

  return (
    <Box h="calc(100vh - 180px)" display="flex" flexDirection="column">
      <Flex align="center" justify="space-between" mb={6} p={4} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="dark.border">
        <HStack spacing={3}>
          <Box w={2} h={2} borderRadius="full" bg="emerald.500" />
          <Box>
            <Heading size="sm">FinAI Coach</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Expert Financial Advisory for Rwanda</Text>
          </Box>
        </HStack>
        <Badge variant="subtle" colorScheme="gray" fontSize="9px">GPT-4o Mini</Badge>
      </Flex>

      <Box 
        flex="1" 
        overflowY="auto" 
        p={6} 
        bg="dark.bg" 
        borderRadius="2xl" 
        border="1px solid" 
        borderColor="dark.border"
        mb={6}
        shadow="inner"
      >
        <VStack align="stretch" spacing={6}>
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <Flex 
                key={i} 
                justify={msg.role === "user" ? "flex-end" : "flex-start"}
              >
                <HStack 
                  align="start" 
                  maxW="80%" 
                  flexDirection={msg.role === "user" ? "row-reverse" : "row"}
                  spacing={3}
                >
                  <Avatar 
                    size="xs" 
                    icon={msg.role === "user" ? <User size={12} /> : <Bot size={12} />} 
                    bg={msg.role === "user" ? "whiteAlpha.200" : "brand.500"}
                  />
                  <Box
                    p={4}
                    bg={msg.role === "user" ? userBg : assistantBg}
                    color="white"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor={msg.role === "user" ? "brand.400" : "dark.border"}
                    borderTopRightRadius={msg.role === "user" ? "0" : "2xl"}
                    borderTopLeftRadius={msg.role === "assistant" ? "0" : "2xl"}
                    shadow="lg"
                  >
                    <Text fontSize="sm" lineHeight="relaxed" whiteSpace="pre-wrap">{msg.content}</Text>
                  </Box>
                </HStack>
              </Flex>
            ))}
          </AnimatePresence>
          {loading && (
            <Flex justify="flex-start">
              <HStack align="start" spacing={3}>
                <Avatar size="xs" icon={<Bot size={12} />} bg="brand.500" />
                <Box p={4} bg={assistantBg} borderRadius="2xl" borderTopLeftRadius="0" border="1px solid" borderColor="dark.border">
                  <Spinner size="xs" color="brand.400" />
                </Box>
              </HStack>
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      <Box p={4} bg="blackAlpha.300" borderRadius="full">
        <HStack spacing={0}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("market_trends")}
            variant="unstyled"
            px={4}
            fontSize="sm"
            flex="1"
            _placeholder={{ color: "whiteAlpha.200" }}
          />
          <IconButton
            aria-label={t("save")}
            icon={<Send size={18} />}
            onClick={sendMessage} 
            colorScheme="brand" 
            borderRadius="full" 
            isLoading={loading}
          />
        </HStack>
      </Box>
    </Box>
  );
}
