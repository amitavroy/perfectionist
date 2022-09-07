import { Layout } from "../components/Layout";

import type { NextPage } from "next";
import { IBreadcrumbLink } from "../components/Breadcrumbs";
import Link from "next/link";
const Home: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [{ name: "Home", link: "#" }];
  return (
    <Layout breadCrumbs={breadCrumbs}>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Link href={"/urls"}>
          <button className="btn btn-accent">My button</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
