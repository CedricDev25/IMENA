import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Select,
  useToast,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { Trash2, Plus } from "lucide-react";
import { useFinance } from "../FinanceContext";
import { useTranslation } from "react-i18next";

export default function Transactions() {
  const { t } = useTranslation();
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Sales");
  const [type, setType] = useState<"income" | "expense">("income");
  const [description, setDescription] = useState("");
  
  const toast = useToast();

  const inputStyle = {
    bg: "dark.bg",
    border: "1px solid",
    borderColor: "dark.border",
    _placeholder: { color: "whiteAlpha.300" },
    _hover: { borderColor: "whiteAlpha.300" },
    _focus: { borderColor: "brand.500", boxShadow: "none" }
  };

  const handleAdd = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid amount",
        status: "error",
        duration: 2000,
      });
      return;
    }

    await addTransaction({
      type,
      category,
      amount: Number(amount),
      description,
    });

    setAmount("");
    setDescription("");
    
    toast({
      title: "Transaction added",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <Box>
      <Box mb={8}>
        <Heading mb={1} size="xl" fontWeight="bold" letterSpacing="tight">{t("transactions")}</Heading>
        <Text color="whiteAlpha.400">Detailed record of your business cash flow.</Text>
      </Box>

      <Box p={6} bg="dark.surface" border="1px solid" borderColor="dark.border" borderRadius="2xl" shadow="xl" mb={8}>
        <Heading size="md" mb={6}>{t("add_transaction")}</Heading>
        <SimpleGrid columns={[1, null, 2, 4]} spacing={4}>
          <Select value={type} onChange={(e) => setType(e.target.value as any)} {...inputStyle}>
            <option value="income" style={{ backgroundColor: "#09090B" }}>{t("income")}</option>
            <option value="expense" style={{ backgroundColor: "#09090B" }}>{t("expense")}</option>
          </Select>
          <Input
            placeholder={`${t("amount")} (${t("rwanda_franc")})`}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            {...inputStyle}
          />
          <Input
            placeholder={`${t("category")} (e.g. Sales, Rent)`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            {...inputStyle}
          />
          <Input
            placeholder={`${t("description")} (optional)`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            {...inputStyle}
          />
        </SimpleGrid>
        <Button 
          mt={6}
          leftIcon={<Plus size={18} />} 
          onClick={handleAdd} 
          colorScheme="brand"
          w={["full", null, "auto"]}
          px={8}
          borderRadius="full"
        >
          {t("add_transaction")}
        </Button>
      </Box>

      <Box bg="dark.surface" border="1px solid" borderColor="dark.border" borderRadius="2xl" shadow="xl" overflow="hidden">
        <Table variant="simple">
          <Thead bg="whiteAlpha.50">
            <Tr>
              <Th color="whiteAlpha.400" borderColor="dark.border">Date</Th>
              <Th color="whiteAlpha.400" borderColor="dark.border">{t("type")}</Th>
              <Th color="whiteAlpha.400" borderColor="dark.border">{t("category")}</Th>
              <Th color="whiteAlpha.400" borderColor="dark.border">{t("description")}</Th>
              <Th isNumeric color="whiteAlpha.400" borderColor="dark.border">{t("amount")}</Th>
              <Th borderColor="dark.border"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((tx) => (
              <Tr key={tx.id} _hover={{ bg: "whiteAlpha.50" }} transition="bg 0.2s">
                <Td fontSize="sm" color="whiteAlpha.400" borderColor="dark.border">
                  {new Date(tx.date).toLocaleDateString()}
                </Td>
                <Td borderColor="dark.border">
                  <Badge 
                    variant="subtle" 
                    colorScheme={tx.type === "income" ? "green" : "red"}
                    px={2}
                    borderRadius="md"
                  >
                    {t(tx.type).toUpperCase()}
                  </Badge>
                </Td>
                <Td fontWeight="medium" borderColor="dark.border">{tx.category}</Td>
                <Td color="whiteAlpha.400" borderColor="dark.border">{tx.description || "-"}</Td>
                <Td isNumeric fontWeight="bold" color={tx.type === "income" ? "emerald.400" : "rose.400"} borderColor="dark.border">
                  {tx.type === "income" ? "+" : "-"} {formatCurrency(tx.amount)}
                </Td>
                <Td isNumeric borderColor="dark.border">
                  <IconButton
                    aria-label="Delete transaction"
                    icon={<Trash2 size={16} />}
                    variant="ghost"
                    colorScheme="red"
                    size="sm"
                    _hover={{ bg: "rose.900", color: "white" }}
                    onClick={() => deleteTransaction(tx.id)}
                  />
                </Td>
              </Tr>
            ))}
            {transactions.length === 0 && (
              <Tr>
                <Td colSpan={6} textAlign="center" py={12} color="whiteAlpha.300">
                  No transactions yet. Add one above!
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
