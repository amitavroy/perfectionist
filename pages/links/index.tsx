import { NextPage } from "next";
import { IBreadcrumbLink } from "../../components/Breadcrumbs";
import { Layout } from "../../components/Layout";

const LinkIndexPage: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Links", link: "#" },
  ];
  return <Layout pageTitle="Link list" breadCrumbs={breadCrumbs}></Layout>;
};

export default LinkIndexPage;
