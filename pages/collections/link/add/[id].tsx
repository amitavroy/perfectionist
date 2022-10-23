import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IBreadcrumbLink } from "../../../../components/Breadcrumbs";
import { UrlAddForm } from "../../../../components/Forms/UrlAddForm";
import { Layout } from "../../../../components/Layout";

const CollectionLinkAddPage: NextPage = () => {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "Add URL", link: "" },
  ];
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    setCollectionId(router.query.id?.toString() || null);
  }, [router.query]);
  return (
    <Layout
      pageTitle="Add new Link to this collection"
      breadCrumbs={breadCrumbs}
    >
      <div className="flex justify-center">
        <div className="w-1/2 shadow rounded p-10 bg-white">
          {collectionId != null && (
            <UrlAddForm
              onSuccess={() => router.push(`/collections/link/view/${id}`)}
              collectionId={collectionId}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CollectionLinkAddPage;
