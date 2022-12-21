import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { Heading1 } from "../../../components/commons/Headings/Heading1";
import { CollectionRetryCountForm } from "../../../components/Forms/CollectionRetryCountForm";
import { PollFrequencySettingForm } from "../../../components/Forms/PollFrequencySettingForm";
import { ZulipStreamNameForm } from "../../../components/Forms/ZulipStreamNameForm";
import { Layout } from "../../../components/Layout";
import HttpService from "../../../services/http.services";

const CollectionSettingsPage: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "Settings", link: "#" },
  ];

  const router = useRouter();
  const { id } = router.query;

  const number_array = ['1', '2', '3', '4', '5']

  const [pollFreqValues, setPollFreqValues] = useState<Array<string> | null>(
    null
  );

  const [retryValues, setRetryValues] = useState<Array<string> | null>(
    null
  );

  const [collectionFreqDBVal, setCollectionFreqDBVal] = useState<string>("");
  const [collectionRetryCountDBVal, setCollectionRetryCountDBVal] = useState<string>("");

  const fetchCollectionSetting = async () => {
    const resp = await HttpService.get(`/collection/settings/${id}`);
    setPollFreqValues(resp.data.freq_values);
    setRetryValues(resp.data.retry_values)

    const collectionPollFreq = resp.data.settings.settings.find(
      (set: any) => set.name == "url_check_frequency"
    );

    const collectionRetryCount = resp.data.settings.settings.find(
      (set: any) => set.name == "retry_count"
    );

    collectionPollFreq && setCollectionFreqDBVal(collectionPollFreq.value);
    collectionRetryCount && setCollectionRetryCountDBVal(collectionRetryCount.value);
  };

  useEffect(() => {
    if (id) fetchCollectionSetting();
  }, [id]);

  return (
    <Layout pageTitle="Collection settings" breadCrumbs={breadCrumbs}>
      <div className="flex justify-start mb-6">
        <div>
          <Heading1 text="Collection settings" />
        </div>
      </div>
      <div className="flex justify-start">
        <div className="w-4/6 shadow rounded p-10 bg-white">
          {id && (
            <PollFrequencySettingForm
              collectionId={id?.toString()}
              pollFreqValues={pollFreqValues || null}
              collectionFreq={collectionFreqDBVal}
            />
          )}
        </div>
      </div>

      <div className="flex justify-start">
        <div className="w-4/6 shadow rounded p-10 bg-white">
          {id && (
            <CollectionRetryCountForm
              collectionId={id?.toString()}
              retryCountValues={retryValues || null}
              collectionFreq={collectionRetryCountDBVal}  />
          )}
        </div>
      </div>

      <div className="flex justify-start mt-6">
        <div className="w-4/6 shadow rounded p-10 bg-white">
          {id && <ZulipStreamNameForm collectionId={id?.toString()} />}
        </div>
      </div>
    </Layout>
  );
};

export default CollectionSettingsPage;
