import { PropsWithChildren, useEffect, useMemo } from 'react';

import { FirebaseApp } from '@firebase/app';
import { configureStore, Reducer } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Core from '..';
import { FirebaseConfig } from '../types/FirebaseConfig';

interface Service {
  initialize(app: FirebaseApp): void;
  reducer?: Reducer;
}

interface StoreConfig {
  reducer: {
    authentication?: Reducer;
    analytics?: Reducer;
  };
  devTools: true;
}

type ServiceName = 'authentication' | 'analytics';

interface FireCMSCoreProps {
  firebaseConfig: FirebaseConfig;
  services: Record<ServiceName, Service>;
}

type MergeProps = FireCMSCoreProps;

/**
 * services를 변경하지 말 것
 */
function FireCMSCore(props: PropsWithChildren<MergeProps>) {
  // 코어 초기화
  useEffect(() => {
    Core.initialize(props.firebaseConfig);
  }, [props.firebaseConfig]);

  // 서비스 초기화
  useEffect(() => {
    if (Core.App) {
      for (const service of Object.values(props.services)) {
        service.initialize(Core.App);
      }
    }
  }, [props.services]);

  // 스토어설정 생성
  const storeConfig = useMemo(() => {
    const reducer = (Object.keys(props.services) as ServiceName[]).reduce<
      Record<ServiceName, Reducer>
    >((acc, serviceName) => {
      const service = props.services[serviceName];
      if (service.reducer) {
        acc[serviceName] = service.reducer;
      }
      return acc;
    }, {} as any);
    const storeConfig: StoreConfig = { reducer: reducer, devTools: true };
    return storeConfig;
  }, [props.services]);

  // 스토어 생성
  const store = useMemo(() => {
    return configureStore(storeConfig);
  }, [storeConfig]);

  return <Provider store={store}>{props.children}</Provider>;
}

FireCMSCore.defaultProps = {};

export default FireCMSCore;
