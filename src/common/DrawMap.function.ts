import { IRebuildData } from "./API.interface";

/**
 * 맵의 마커를 그리는 함수
 * @param marker 마커
 * @param item 재건축데이터
 * @param map 맵
 * @returns marker를 리턴한다.
 */
export const drawMarker = (
  marker: naver.maps.Marker | null,
  item: IRebuildData,
  map?: naver.maps.Map
) => {
  let position = new naver.maps.LatLng(
    Number(item.latitude),
    Number(item.longitude)
  );
  marker = new naver.maps.Marker({
    title: item.districtNm,
    map: map,
    position: position,
    icon: {
      content: [
        `<div class="markerWrap">
            <div class="title">${item.districtNm}</div>
            <ul>                            
                <li class="contentsList">전체 ${item.allCnt}</li>
                ${returnLi(item.reConstructionCnt, "재건축")}
                ${returnLi(item.reDevelopmentCnt, "재개발")}
                ${returnLi(item.maintenanceSmallCnt, "가로주택")}
            </ul>
        </div>`,
      ].join(),
    },
  });
  return marker;
};

/**
 * marker 의 innerHtml li를 그리기 위한 함수
 * @param count 개수
 * @param type 재개발, 재건축, 가로주택
 * @returns li를 리턴해준다.
 */
const returnLi = (
  count: number,
  type: "재개발" | "재건축" | "가로주택"
): string => {
  if (count > 0) {
    return `<li class="contentsList">${type} ${count}</li>`;
  }
  return "";
};

/**
 * 마커를 위치에 따라 보이고 가리기 위한 함수
 * @param markers
 * @param map
 */
export const updateMarkers = (
  markers: naver.maps.Marker[],
  map: naver.maps.Map | null
) => {
  if (map !== null) {
    let mapBounds: any = map.getBounds();
    let marker;
    let position;

    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  }
};

const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
  if (marker.getMap()) return;
  marker.setMap(map);
};

const hideMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
  if (!marker.getMap()) return;
  marker.setMap(null);
};
