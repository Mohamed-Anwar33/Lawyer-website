
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { siteSettings } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

// تعيين مفتاح API العام لـ Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2twYWFxMzZ5MDgxMzJ4cGRvM3Q0Y3R0ZSJ9.i_BxFOmI-Eabq5KnVVy4Sg';

const RealMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { language, t } = useLanguage();
  
  const { lat, lng, zoom } = siteSettings.location;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // إضافة عناصر التحكم في التنقل
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // إنشاء marker في موقع المكتب
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.width = '30px';
    markerElement.style.height = '30px';
    markerElement.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
    markerElement.style.backgroundSize = 'cover';
    markerElement.style.borderRadius = '50%';
    markerElement.style.cursor = 'pointer';
    
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="font-family: Arial, sans-serif; padding: 8px;">
          <h3 style="margin: 0 0 8px; font-size: 16px; color: #14213d;">${t('firm.name')}</h3>
          <p style="margin: 0; font-size: 14px;">${siteSettings.contactInfo.address}</p>
          <p style="margin: 4px 0 0; font-size: 14px;">${siteSettings.contactInfo.phone}</p>
        </div>
      `);

    new mapboxgl.Marker(markerElement)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(mapInstance);

    map.current = mapInstance;

    mapInstance.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [lat, lng, zoom, t]);

  // حدّث العنوان في الـ popup عندما تتغير اللغة
  useEffect(() => {
    if (map.current && mapLoaded) {
      const markerElements = document.getElementsByClassName('mapboxgl-marker');
      if (markerElements.length > 0) {
        const markerElement = markerElements[0] as HTMLElement;
        markerElement.click(); // إعادة فتح الـ popup لتحديث المحتوى
        setTimeout(() => {
          const closeButtons = document.getElementsByClassName('mapboxgl-popup-close-button');
          if (closeButtons.length > 0) {
            (closeButtons[0] as HTMLElement).click(); // إغلاق الـ popup
          }
        }, 10);
      }
    }
  }, [language, mapLoaded, t]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default RealMap;
