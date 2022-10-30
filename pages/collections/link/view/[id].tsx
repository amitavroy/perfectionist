import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IBreadcrumbLink } from "../../../../components/Breadcrumbs";
import { Heading1 } from "../../../../components/commons/Headings/Heading1";
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

  const deleteUrl = async (url: IUrl) => {
    try {
      await HttpService.delete(`url/${url.id}`);
      await fetchUrls();
    } catch (error) {}
  };

  useEffect(() => {
    if (id !== undefined) fetchUrls();
    if (page && page != "" && id !== undefined)
      router.replace({
        pathname: `/collections/link/view/${id}`,
        query: { page },
      });
  }, [id, page]);

  return (
    <Layout pageTitle="Links for this collection" breadCrumbs={breadCrumbs}>
      <div className="flex justify-between">
        <div>
          <Heading1 text="Links for this collection" />
        </div>
        <div>
          <Link href={`/collections/link/add/${id}`}>
            <a className="btn btn-primary">Add new link</a>
          </Link>
        </div>
      </div>
      {urlData && urlData != null && (
        <div className="flex flex-col">
          <div className="mt-4">
            <LinksTable
              data={urlData?.data}
              onDelete={(url) => deleteUrl(url)}
            />
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
