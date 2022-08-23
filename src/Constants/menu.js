import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RepeatIcon from '@mui/icons-material/Repeat';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HelpIcon from '@mui/icons-material/Help';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BookIcon from '@mui/icons-material/Book';

export const GetItems = () => {
  let json = {
    list: [
      {
        id: 0,
        name: "Home",
        icon: <HomeIcon sx={{color: "#66cdaa"}}/>,
      },
      {
        id: 1,
        name: "System Config",
        icon: <SettingsSuggestIcon sx={{color: "#66cdaa"}}/>,
      },
      {
        id: 2,
        name: "Stage Processing",
        icon: <SendIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Download",
            icon: <DownloadIcon sx={{color: "#66cdaa"}}/>,
          },
          {
            id: 2,
            name: "Upload Inventory",
            icon: <UploadIcon sx={{color: "#66cdaa"}}/>,
          },
          {
            id: 3,
            name: "Upload Non Inventory",
            icon: <UploadIcon sx={{color: "#66cdaa"}}/>,
          },
        ],
      },
      {
        id: 3,
        name: "Transaction Processing",
        icon: <ReceiptIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Error Processing",
          },
        ],
      },
      {
        id: 4,
        name: "Reconciliation Report",
        icon: <RepeatIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Reconciliation",
          },
        ],
      },
      {
        id: 5,
        name: "Transaction Inquiry",
        icon: <HelpIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Inquiry",
          },
        ],
      },
      {
        id: 6,
        name: "Transaction Maintenance",
        icon: <ReceiptLongIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Edit Transaction",
          },
          {
            id: 2,
            name: "Transaction Reversal",
          },
        ],
      },
      {
        id: 7,
        name: "Cost Maintenance",
        icon: <ReceiptIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Unit Cost Maintenance",
            },

            
        ],
      },
      {
        id: 8,
        name: "Account maintenance",
        icon: <BookIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Account maintenance",
          },
          {
            id:2,
            name: "Account creation",
          },
        ],
      },
      {
        id: 9,
        name: "Finance Interface",
        icon: <SendIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Finance Interface Data",
            },

            
        ],
      },
    ],
  };
  return json;
};
