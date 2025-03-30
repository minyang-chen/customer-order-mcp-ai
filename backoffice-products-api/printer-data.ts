export interface Printer {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  price: number
}

const printers: Array<Printer> = [
  {
    id: 1,
    name: "EcoPrint 3000",
    image: "/eco-print-3000.jpg",
    description:
      "The EcoPrint 3000 is designed for the environmentally conscious user. It uses recycled materials in its construction and features an energy-saving mode that reduces power consumption by up to 50%. It offers high-quality printing with vibrant colors and sharp text.",
    shortDescription:
      "Eco-friendly printer with energy-saving features and high-quality output.",
    price: 249,
  },
  {
    id: 2,
    name: "SpeedyJet Pro",
    image: "/speedy-jet-pro.jpg",
    description:
      "The SpeedyJet Pro is built for speed. It can print up to 40 pages per minute in black and white and 30 pages per minute in color. It's perfect for busy offices that need to print large volumes quickly.",
    shortDescription:
      "High-speed printer capable of printing up to 40 pages per minute.",
    price: 399,
  },
  {
    id: 3,
    name: "ColorBurst 500",
    image: "/color-burst-500.jpg",
    description:
      "The ColorBurst 500 is designed for those who need vibrant, high-resolution color printing. It uses advanced ink technology to produce stunning photos and graphics. It also features wireless connectivity for easy printing from any device.",
    shortDescription:
      "High-resolution color printer with advanced ink technology and wireless connectivity.",
    price: 449,
  },
  {
    id: 4,
    name: "CompactPrint Mini",
    image: "/compact-print-mini.jpg",
    description:
      "The CompactPrint Mini is a small, portable printer that's perfect for students or anyone who needs to print on the go. It's lightweight and easy to carry, and it can connect wirelessly to your phone or laptop.",
    shortDescription:
      "Portable mini printer with wireless connectivity, ideal for on-the-go printing.",
    price: 129,
  },
  {
    id: 5,
    name: "LaserSharp 1000",
    image: "/laser-sharp-1000.jpg",
    description:
      "The LaserSharp 1000 is a laser printer that produces crisp, clear text and graphics. It's designed for high-volume printing and can handle large print jobs with ease. It also features duplex printing to save paper.",
    shortDescription:
      "High-volume laser printer with duplex printing for crisp text and graphics.",
    price: 599,
  },
  {
    id: 6,
    name: "PhotoPro Max",
    image: "/photo-pro-max.jpg",
    description:
      "The PhotoPro Max is a professional-grade photo printer that produces stunning, gallery-quality prints. It uses a wide range of inks to create vibrant colors and deep blacks. It also features a large touchscreen display for easy navigation.",
    shortDescription:
      "Professional photo printer with gallery-quality output and a large touchscreen display.",
    price: 799,
  },
  {
    id: 7,
    name: "MultiFunction X5",
    image: "/multi-function-x5.jpg",
    description:
      "The MultiFunction X5 is an all-in-one printer that can print, scan, copy, and fax. It's perfect for small businesses or home offices that need a versatile device. It also features automatic document feeding for easy scanning and copying.",
    shortDescription:
      "All-in-one printer with print, scan, copy, and fax capabilities.",
    price: 349,
  },
  {
    id: 8,
    name: "DuraPrint Industrial",
    image: "/dura-print-industrial.jpg",
    description:
      "The DuraPrint Industrial is a heavy-duty printer designed for industrial environments. It's built to withstand harsh conditions and can handle large print jobs with ease. It also features secure printing to protect sensitive documents.",
    shortDescription:
      "Heavy-duty industrial printer with secure printing features.",
    price: 999,
  },
  {
    id: 9,
    name: "SmartPrint Cloud",
    image: "/smart-print-cloud.jpg",
    description:
      "The SmartPrint Cloud is a cloud-connected printer that allows you to print from anywhere in the world. It features advanced security features to protect your data and can be managed remotely. It also integrates with popular cloud services.",
    shortDescription:
      "Cloud-connected printer with remote management and advanced security features.",
    price: 499,
  },
  {
    id: 10,
    name: "LabelMaster Pro",
    image: "/label-master-pro.jpg",
    description:
      "The LabelMaster Pro is a specialized label printer that can print on a variety of label types and sizes. It's perfect for businesses that need to print shipping labels, product labels, or barcodes. It also features a built-in label cutter.",
    shortDescription:
      "Specialized label printer with a built-in cutter for various label types and sizes.",
    price: 299,
  },
];

export default printers;
