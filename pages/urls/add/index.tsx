import { useRouter } from "next/router";
import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { UrlAddForm } from "../../../components/Forms/UrlAddForm";
import { Layout } from "../../../components/Layout";

const UrlAddPage = () => {
  const router = useRouter();
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "URLs", link: "/urls" },
    { name: "Add URL", link: "#" },
  ];
  return (
    <Layout pageTitle="Add a new URL" breadCrumbs={breadCrumbs}>
      <div className="flex justify-center">
        <div className="w-1/2 shadow rounded p-10 bg-white">
          <UrlAddForm onSuccess={() => router.push("/urls")} />
        </div>
      </div>
    </Layout>
  );
};

export default UrlAddPage;
