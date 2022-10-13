import { NextPage } from "next";
import { useRouter } from "next/router";
import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { CollectionAddForm } from "../../../components/Forms/CollectionAddForm";
import { Layout } from "../../../components/Layout";

const CollectionAdd: NextPage = () => {
  const router = useRouter();
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "Add Collections", link: "#" },
  ];
  return (
    <Layout pageTitle="Create a new Collection" breadCrumbs={breadCrumbs}>
      <div className="flex justify-center">
        <div className="w-1/2 shadow rounded p-10 bg-white">
          <CollectionAddForm onSuccess={() => router.push("/collections")} />
        </div>
      </div>
    </Layout>
  );
};

export default CollectionAdd;
