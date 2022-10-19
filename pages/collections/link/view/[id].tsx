import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IBreadcrumbLink } from "../../../../components/Breadcrumbs";
import { Layout } from "../../../../components/Layout";
import { LinksTable } from "../../../../components/LinkTable";
import { Pagination } from "../../../../components/Pagination";
import { IPaginatedData } from "../../../../interfaces/commons/paginate.interface";
import { IUrl } from "../../../../interfaces/models/url.interface";
import HttpService from "../../../../services/http.services";

interface IPaginatedUrls extends IPaginatedData {
  data: Array<IUrl>;
}

const CollectionLinkPage: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
  ];
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(router.query?.page || 1);
  const [urlData, setUrlData] = useState<IPaginatedUrls | null>(null);

  const fetchUrls = async () => {
    const resp = await HttpService.get(`collection/${id}/urls?page=${page}`);
    resp.status === 200 && setUrlData(resp.data.data);
  };

  useEffect(() => {
    if (id !== undefined) fetchUrls();
    if (page && page != "")
      router.replace({
        pathname: `/collections/link/view/${id}`,
        query: { page },
      });
  }, [id, page]);

  return (
    <Layout pageTitle="Links for this collection" breadCrumbs={breadCrumbs}>
      {urlData && urlData != null && (
        <div className="flex flex-col">
          <div className="mt-4">
            <LinksTable data={urlData?.data} onDelete={() => {}} />
          </div>
          {urlData.total > urlData.per_page && (
            <div className="flex justify-center">
              <Pagination
                data={urlData}
                onChange={(pageNum) => setPage(pageNum)}
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CollectionLinkPage;

// interface PageProps {
//   collectionId: any;
// }

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   params,
// }) => {
//   return {
//     props: { collectionId: params?.id },
//   };
// };
