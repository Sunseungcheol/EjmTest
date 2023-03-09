import { IRebuildData } from "common/API.interface";
import { useQuery } from "react-query";

interface IFetchRebuildDataParam {
  neLan: naver.maps.LatLng;
  swLan: naver.maps.LatLng;
}

const fetchRebuildData = async ({
  neLan,
  swLan,
}: IFetchRebuildDataParam): Promise<IRebuildData[]> => {
  const getLan = new naver.maps.LatLngBounds(neLan, swLan);
  const response = await fetch(process.env.REACT_APP_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      level: 1, // 레벨
      neLat: getLan.getNE().lat(), // 동남쪽 위도
      neLng: getLan.getNE().lng(), // 동남쪽 경도
      swLat: getLan.getSW().lat(), // 북서쪽 위도
      swLng: getLan.getSW().lng(), // 북서쪽 경도
    }),
  });

  if (!response.ok) {
    throw new Error("response error");
  }

  const data = await response.json();
  return data;
};

const useRebuildData = ({ neLan, swLan }: IFetchRebuildDataParam) =>
  useQuery(["rebuildData"], () => fetchRebuildData({ neLan, swLan }));
export default useRebuildData;
