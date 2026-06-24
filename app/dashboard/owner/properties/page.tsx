import React from 'react';
import { getOwnerProperties } from '@/lib/api/properties';
import OwnerPropertiesPage from './OwnerPropertiesPage';


async function Page() {
  const ownerId = '1';
  const properties = await getOwnerProperties(ownerId) || [];

  return <OwnerPropertiesPage initialProperties={properties} />;
}

export default Page;