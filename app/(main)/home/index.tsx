import StyledText from '@/components/base/StyledText';
import { formatDate } from '@/utils/date';
import { formatNumber } from '@/utils/formatter';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import AlertMessage from '@/components/base/AlertMessage';
import Constants from 'expo-constants';

export default function Home() {
    const locationRef = useRef<MapView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [locationPermission, setLocationPermission] = useState(false);
    const [facing, setFacing] = useState<CameraType>('back');
    useEffect(() => {
        AlertMessage('Updated');
    }, []);
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            locationRef?.current?.fitToCoordinates(
                [
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                ],
                {
                    animated: true,
                },
            );
            setLocationPermission(true);
        }
    };
    const openCamera = async () => {
        const { status } = await requestPermission();
        if (status === 'granted') {
        }
    };
    return (
        <View className="flex-1 justify-center items-center ">
            <StyledText className="dark:!text-red-500" originValue={formatNumber(100000.23934324)} />
            <StyledText className="!text-primary" originValue={formatDate(new Date())} />

            <Link push href="/profile/24" asChild>
                <Button title="Detail" />
            </Link>
            <Button color="red" onPress={requestLocationPermission} title="Focus user location" />
            <Button color="blue" onPress={openCamera} title="Open camera" />
            {permission && (
                <CameraView
                    style={{
                        width: '100%',
                        height: 200,
                    }}
                    facing={facing}
                >
                    <Button onPress={() => setFacing(facing === 'back' ? 'front' : 'back')} title="Switch camera" />
                </CameraView>
            )}

            {locationPermission && (
                <MapView
                    ref={locationRef}
                    showsUserLocation
                    zoomEnabled
                    zoomControlEnabled
                    style={{
                        width: '100%',
                        height: 200,
                    }}
                />
            )}
        </View>
    );
}
