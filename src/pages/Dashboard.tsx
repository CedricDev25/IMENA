import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Text,
  HStack,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";
import { useFinance } from "../FinanceContext";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();
  const { totalIncome, totalExpenses, netProfit, profitMargin } = useFinance();

  const data = [
    { name: t("income"), value: totalIncome, color: "#60A5FA" },
    { name: t("expenses"), value: totalExpenses, color: "#FB7185" },
    { name: t("profit"), value: netProfit, color: "#34D399" },
  ];

  const getInsight = () => {
    if (profitMargin > 20) return t("insight_positive");
    if (profitMargin > 5) return t("insight_neutral");
    return t("insight_negative");
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={8} wrap="wrap" gap={4}>
        <Box>
          <Heading mb={1} size="xl" fontWeight="bold" letterSpacing="tight">{t("dashboard")}</Heading>
          <Text color="whiteAlpha.400">Monitoring your business health in real-time.</Text>
        </Box>
        <HStack bg="whiteAlpha.50" p={1} borderRadius="lg" border="1px solid" borderColor="dark.border">
          <Button size="sm" variant="ghost" bg="whiteAlpha.100" _hover={{ bg: "whiteAlpha.200" }}>Last 30 Days</Button>
          <Button size="sm" variant="ghost" color="whiteAlpha.400" _hover={{ color: "white" }}>Last Quarter</Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
        <StatCard label={t("revenue")} value={totalIncome} type="increase" trend="0%" />
        <StatCard label={t("expenses")} value={totalExpenses} type="decrease" trend="0%" isNegative />
        <StatCard label={t("profit")} value={netProfit} type="increase" trend="0%" isHighlight />
        <StatCard label={t("margin")} value={profitMargin} type="increase" trend="0%" isPercent />
      </SimpleGrid>

      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={8}>
        <Box p={6} bg="dark.surface" border="1px solid" borderColor="dark.border" borderRadius="2xl" shadow="xl">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading size="md">Business Health</Heading>
            <HStack spacing={4}>
              <Flex align="center" gap={2}>
                <Box w={2} h={2} bg="brand.500" borderRadius="full" />
                <Text fontSize="xs" color="whiteAlpha.400">Actuals</Text>
              </Flex>
            </HStack>
          </Flex>
          <Box h="250px" w="100%">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                  tickFormatter={(value) => `${t("rwanda_franc")} ${value / 1000}k`} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#161618', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                  }}
                  itemStyle={{ color: '#F4F4F5' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box p={6} bg="dark.surface" border="1px solid" borderColor="dark.border" borderRadius="2xl" shadow="xl">
          <Flex align="center" gap={2} mb={6}>
            <Icon as={Sparkles} color="brand.400" />
            <Heading size="md">{t("summary")}</Heading>
          </Flex>
          <VStack align="stretch" spacing={4}>
            <Box p={4} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
              <Text fontSize="sm" color="whiteAlpha.700" lineHeight="tall">
                {getInsight()}
              </Text>
            </Box>
            <SimpleGrid columns={2} spacing={4}>
              <Box>
                <Text fontSize="xs" color="whiteAlpha.400" mb={1}>{t("income")}</Text>
                <Text fontWeight="bold">{formatCurrency(totalIncome)}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="whiteAlpha.400" mb={1}>{t("expenses")}</Text>
                <Text fontWeight="bold">{formatCurrency(totalExpenses)}</Text>
              </Box>
            </SimpleGrid>
            <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
              <Text fontSize="xs" color="whiteAlpha.400" mb={2}>Recommendation</Text>
              <Text fontSize="sm" fontWeight="medium">
                {netProfit > 0 ? "You have a surplus. Consider setting aside 10% for emergencies." : "Review your top expense categories to identify potential savings."}
              </Text>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

function StatCard({
  label,
  value,
  type,
  trend,
  isHighlight,
  isNegative,
  isPercent
}: {
  label: string;
  value: number;
  type: "increase" | "decrease";
  trend: string;
  isHighlight?: boolean;
  isNegative?: boolean;
  isPercent?: boolean;
}) {
  const trendColor = isNegative ? "rose.400" : "emerald.400";
  const mainColor = isHighlight ? "brand.400" : (isNegative ? "rose.400" : "white");

  return (
    <Stat p={5} bg="dark.surface" border="1px solid" borderColor="dark.border" borderRadius="2xl" shadow="xl">
      <StatLabel fontSize="sm" fontWeight="medium" color="whiteAlpha.400" mb={1}>{label}</StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold" color={mainColor}>
        {isPercent ? `${value.toFixed(1)}%` : formatCurrency(value)}
      </StatNumber>
      <Flex mt={2} align="center" fontSize="xs" fontWeight="bold" color={trendColor}>
        <Text>{type === "increase" ? "↑" : "↓"} {trend}</Text>
        <Text ml={1} fontWeight="normal" color="whiteAlpha.300">vs last month</Text>
      </Flex>
    </Stat>
  );
}
