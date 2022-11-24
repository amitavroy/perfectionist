import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IBreadcrumbLink } from "../../components/Breadcrumbs";
import { CollectionTable } from "../../components/CollectionTable";
import { Heading1 } from "../../components/commons/Headings/Heading1";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination";
import { IPaginatedData } from "../../interfaces/commons/paginate.interface";
import { ICollection } from "../../interfaces/models/collection.interface";
import HttpService from "../../services/http.services";

interface IPaginatedCollections extends IPaginatedData {
  data: Array<ICollection>;
}

const CollectionIndex: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
  ];

  const router = useRouter();
  const [page, setPage] = useState(router.query?.page || 1);
  const [collectionData, setCollectionData] =
    useState<IPaginatedCollections | null>(null);

  const fetchCollections = async () => {
    const resp = await HttpService.get(`collection?page=${page}`);
    resp.status === 200 && setCollectionData(resp.data.data);
  };

  useEffect(() => {
    router.push({ pathname: "/collections", query: { page } });
    fetchCollections();
  }, [page]);

  const deleteCollection = async (collection: ICollection) => {
    await HttpService.delete(`collection/${collection.id}`);
    await fetchCollections();
  };

  return (
    <Layout pageTitle="List of my collections" breadCrumbs={breadCrumbs}>
      <div className="flex justify-between">
        <div>
          <Heading1 text="My Collections list" />
        </div>
        <div>
          <Link href="/collections/add">
            <a className="btn btn-primary">Add new Collection</a>
          </Link>
        </div>
      </div>
      {collectionData !== null && (
        <div className="flex flex-col">
          <div className="mt-4">
            <CollectionTable
              data={collectionData.data}
              onDelete={deleteCollection}
            />
          </div>
          {collectionData.total > collectionData.per_page && (
            <div className="flex justify-center">
              <Pagination
                data={collectionData}
                onChange={(pageNum) => setPage(pageNum)}
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CollectionIndex;
