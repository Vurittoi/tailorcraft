import React, { useState } from 'react';
import { BodyMeasurements, NavPage } from '../types/suitTypes';
import { ProfileHeader } from './ProfileHeader';
import { MeasurementPresets } from './MeasurementPresets';
import {
  MEASUREMENT_FIELDS,
  MeasureFieldKey,
  MeasurementSliderCard,
} from './MeasurementSliderCard';
import { FitPreferenceForm, FitPreferenceType } from './FitPreferenceForm';
import { MeasurementBlueprintSVG } from './MeasurementBlueprintSVG';

interface ProfileMeasurementsPageProps {
  measurements: BodyMeasurements;
  setMeasurements: React.Dispatch<React.SetStateAction<BodyMeasurements>>;
  selectedPresetKey: string;
  setSelectedPresetKey: React.Dispatch<React.SetStateAction<string>>;
  navigateToPage: (targetPage: NavPage) => void;
  handleOpenOrderSummary: () => void;
}

export function ProfileMeasurementsPage({
  measurements,
  setMeasurements,
  selectedPresetKey,
  setSelectedPresetKey,
  navigateToPage,
  handleOpenOrderSummary,
}: ProfileMeasurementsPageProps) {
  const [activeMeasureField, setActiveMeasureField] =
    useState<MeasureFieldKey>('chestCm');
  const [fitPreference, setFitPreference] =
    useState<FitPreferenceType>('classic');
  const [savedMeasurementToast, setSavedMeasurementToast] =
    useState<boolean>(false);

  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8">
      {/* 1. Header & Điều hướng trang */}
      <ProfileHeader
        navigateToPage={navigateToPage}
        handleOpenOrderSummary={handleOpenOrderSummary}
      />

      {/* 2. Bộ chọn phom số đo chuẩn */}
      <MeasurementPresets
        measurements={measurements}
        setMeasurements={setMeasurements}
        selectedPresetKey={selectedPresetKey}
        setSelectedPresetKey={setSelectedPresetKey}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* 3. Card điều khiển từng chỉ số */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MEASUREMENT_FIELDS.map((item) => (
              <MeasurementSliderCard
                key={item.field}
                item={item}
                currentVal={measurements[item.field]}
                isFocused={activeMeasureField === item.field}
                onFocusField={setActiveMeasureField}
                setMeasurements={setMeasurements}
              />
            ))}
          </div>

          {/* 4. Tùy chọn độ ôm Slim/Classic/Comfort & Ghi chú */}
          <FitPreferenceForm
            fitPreference={fitPreference}
            setFitPreference={setFitPreference}
            measurements={measurements}
            setMeasurements={setMeasurements}
          />
        </div>

        {/* 5. Sơ đồ SVG phom dáng 2D & Thống kê Blueprint */}
        <MeasurementBlueprintSVG
          measurements={measurements}
          activeMeasureField={activeMeasureField}
          savedMeasurementToast={savedMeasurementToast}
          setSavedMeasurementToast={setSavedMeasurementToast}
          navigateToPage={navigateToPage}
          handleOpenOrderSummary={handleOpenOrderSummary}
        />
      </div>
    </section>
  );
}
