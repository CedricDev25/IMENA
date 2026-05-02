import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, ReceiptText, MessageSquareQuote, Settings, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { useFinance } from "../FinanceContext";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { userEmail, setUserEmail } = useFinance();
  const location = useLocation();

  const navItems = [
    { name: t("dashboard"), path: "/dashboard", icon: LayoutDashboard },
    { name: t("transactions"), path: "/transactions", icon: ReceiptText },
    { name: t("ai_coach"), path: t("ai_coach"), path_raw: "/ai-coach", icon: MessageSquareQuote },
    { name: t("settings"), path: "/settings", icon: Settings },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "rw", name: "Kinyarwanda" },
  ];

  return (
    <Flex minH="100vh" bg="dark.bg" color="#F4F4F5" fontFamily="'Inter', sans-serif">
      {/* Sidebar Navigation */}
      <Box 
        as="nav" 
        w="64" 
        bg="dark.sidebar" 
        borderRight="1px solid" 
        borderColor="dark.border" 
        p={6} 
        display="flex" 
        flexDirection="column"
        position="fixed"
        h="full"
      >
        <Flex align="center" gap={3} mb={10}>
          <Box w={8} h={8} bg="brand.500" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            <Text fontWeight="bold" color="white" fontSize="lg">F</Text>
          </Box>
          <Text fontSize="xl" fontWeight="semibold" tracking="tight">
            FinAI Coach
          </Text>
        </Flex>

        <VStack spacing={2} align="stretch" flex={1}>
          {navItems.map((item) => {
            const path = (item as any).path_raw || item.path;
            const isActive = location.pathname === path;
            return (
              <Link
                as={RouterLink}
                key={path}
                to={path}
                px={4}
                py={2}
                borderRadius="md"
                bg={isActive ? "whiteAlpha.100" : "transparent"}
                border={isActive ? "1px solid" : "none"}
                borderColor={isActive ? "whiteAlpha.200" : "transparent"}
                color={isActive ? "white" : "whiteAlpha.500"}
                _hover={{
                  textDecoration: "none",
                  bg: "whiteAlpha.100",
                  color: "white",
                }}
                display="flex"
                alignItems="center"
                gap={3}
                transition="all 0.2s"
              >
                <Icon as={item.icon} size={18} color={isActive ? "brand.400" : "inherit"} />
                <Text fontWeight={isActive ? "medium" : "normal"}>{item.name}</Text>
              </Link>
            );
          })}
        </VStack>

        <VStack spacing={4} mt="auto">
          <Menu>
            <MenuButton 
              as={Button} 
              variant="outline" 
              borderColor="dark.border" 
              color="whiteAlpha.600" 
              leftIcon={<Globe size={16} />}
              rightIcon={<ChevronDown size={14} />}
              size="sm"
              w="full"
              _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.300", color: "white" }}
              _active={{ bg: "whiteAlpha.100" }}
            >
              {languages.find(l => l.code === i18n.language.split('-')[0])?.name || "Language"}
            </MenuButton>
            <MenuList bg="dark.sidebar" borderColor="dark.border">
              {languages.map(lang => (
                <MenuItem 
                  key={lang.code} 
                  bg="transparent" 
                  _hover={{ bg: "whiteAlpha.100" }}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Box textAlign="left" w="full" px={1}>
            <Text fontSize="xs" color="whiteAlpha.400" mb={1}>Signed in as:</Text>
            <Text fontSize="sm" fontWeight="medium" color="white" isTruncated>{userEmail}</Text>
          </Box>

          <Button
            variant="ghost"
            color="rose.400"
            leftIcon={<LogOut size={18} />}
            w="full"
            justifyContent="flex-start"
            px={4}
            size="sm"
            onClick={() => setUserEmail(null)}
            _hover={{ bg: "rose.900", color: "white" }}
          >
            {t("logout")}
          </Button>

          <Box 
            p={4} 
            bgGradient="linear(to-br, brand.900, transparent)" 
            border="1px solid" 
            borderColor="brand.800" 
            borderRadius="xl"
            w="full"
          >
            <Text fontSize="xs" color="brand.400" fontWeight="bold" textTransform="uppercase" tracking="wider" mb={1}>
              Pro Advisor
            </Text>
            <Text fontSize="sm" color="whiteAlpha.700">
              Get personalized Rwandan market insights.
            </Text>
          </Box>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex={1} ml="64" p={8} display="flex" flexDirection="column">
        <Box maxW="7xl" w="full" mx="auto">
          <Outlet />
        </Box>
        
        <Box as="footer" mt="auto" pt={8} display="flex" justifyContent="space-between" alignItems="center" fontSize="11px" color="whiteAlpha.200">
          <Text>&copy; 2026 FinAI Coach Rwanda. Certified Advisor Interface.</Text>
          <Flex gap={4}>
            <Flex align="center" gap={1}>
              <Box w={1} h={1} bg="whiteAlpha.200" borderRadius="full" />
              Secure API
            </Flex>
            <Flex align="center" gap={1}>
              <Box w={1} h={1} bg="whiteAlpha.200" borderRadius="full" />
              Cloud Synced
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
