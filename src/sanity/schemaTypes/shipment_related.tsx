const shipment = {
  name: 'shipment',
  type: 'document',
  title: 'Shipment',
  fields: [
    {
      name: 'shipmentId',
      type: 'string',
      title: 'Shipment ID',
    },
    {
      name: 'shipDate',
      type: 'datetime',
      title: 'Ship Date',
    },
    {
      name: 'shipmentStatus',
      type: 'string',
      title: 'Shipment Status',
    },
    {
      name: 'shipFrom',
      type: 'object',
      title: 'Ship From',
      fields: [
        { name: 'addressLine1', type: 'string', title: 'Address Line 1' },
        { name: 'addressLine2', type: 'string', title: 'Address Line 2' },
        { name: 'addressLine3', type: 'string', title: 'Address Line 3' },
        { name: 'addressResidentialIndicator', type: 'string', title: 'Address Residential Indicator' },
        { name: 'cityLocality', type: 'string', title: 'City Locality' },
        { name: 'companyName', type: 'string', title: 'Company Name' },
        { name: 'countryCode', type: 'string', title: 'Country Code' },
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'postalCode', type: 'string', title: 'Postal Code' },
        { name: 'stateProvince', type: 'string', title: 'State/Province' },
      ],
    },
    {
      name: 'shipTo',
      type: 'object',
      title: 'Ship To',
      fields: [
        { name: 'addressLine1', type: 'string', title: 'Address Line 1' },
        { name: 'addressLine2', type: 'string', title: 'Address Line 2' },
        { name: 'addressLine3', type: 'string', title: 'Address Line 3' },
        { name: 'addressResidentialIndicator', type: 'string', title: 'Address Residential Indicator' },
        { name: 'cityLocality', type: 'string', title: 'City Locality' },
        { name: 'companyName', type: 'string', title: 'Company Name' },
        { name: 'countryCode', type: 'string', title: 'Country Code' },
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'postalCode', type: 'string', title: 'Postal Code' },
        { name: 'stateProvince', type: 'string', title: 'State/Province' },
      ],
    },
  ],
};

export default shipment;