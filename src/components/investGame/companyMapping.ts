interface Company {
  name: string;
  logo: string;
}

interface CompanyMapping {
  [key: string]: Company;
}

export const companyMapping: CompanyMapping = {
  bitcoin: {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  ethereum: {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
  },
  cardano: {
    name: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tesla_logo.svg",
  },
  tether: {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  binancecoin: {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  // Add more mappings here
};
