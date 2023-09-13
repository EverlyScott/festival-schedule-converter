import BasicLayout from "@/utils/BasicLayout";
import { Metadata } from "next";
import { metadata as rootMetadata } from "../layout";

export const metadata: Metadata = {
  ...rootMetadata,
  title: `Login | ${rootMetadata.title}`,
};

export default BasicLayout;
