import React, { useEffect, useState } from "react";
import { ButtonStyled, StyledList } from "common/CommonStyled";
import { drawMarker, updateMarkers } from "common/DrawMap.function";
import useRebuildData from "hooks/useRebuildData";

const Main: React.FC = () => {
  const neLan = new naver.maps.LatLng(41.708069, 131.4902006);
  const swLan = new naver.maps.LatLng(32.280495, 124.9220854);
  const { data, isSuccess } = useRebuildData({ neLan, swLan });
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [buttonText, setButtonText] = useState<string>("위성");

  //지도 유형 변경함수
  const onChangeViewHanlder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: keyof typeof naver.maps.MapTypeId
  ) => {
    e.preventDefault();
    setButtonText(buttonText === "일반" ? "위성" : "일반");
    if (map && map.getMapTypeId() !== naver.maps.MapTypeId[type]) {
      map.setMapTypeId(naver.maps.MapTypeId[type]); // 지도 유형 변경하기
    }
  };

  useEffect(() => {
    let drawMap: naver.maps.Map | null = null;
    let marker: naver.maps.Marker | null = null;
    let markers: naver.maps.Marker[] = [];

    const initMap = () => {
      drawMap = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.56667, 126.97806),
        zoomControl: true,
        zoom: 8,
      });

      setMap(drawMap);
      if (isSuccess && data) {
        for (const item of data) {
          if (item.allCnt > 0) {
            //총 카운트가 0개인것 제외
            markers.push(drawMarker(marker, item, drawMap));
          }
        }
      }
    };

    initMap();

    naver.maps.Event.addListener(drawMap, "idle", function () {
      updateMarkers(markers, drawMap);
    });
  }, [data, isSuccess]);

  return (
    <StyledList id="map" style={{ width: "100%", height: window.innerHeight }}>
      <ButtonStyled
        onClick={(e) =>
          onChangeViewHanlder(e, buttonText === "일반" ? "NORMAL" : "SATELLITE")
        }
      >
        {buttonText}
      </ButtonStyled>
    </StyledList>
  );
};

export default Main;
