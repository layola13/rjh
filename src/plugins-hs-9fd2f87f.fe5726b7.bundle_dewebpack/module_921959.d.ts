import React from 'react';

/**
 * Address data structure
 */
export interface AddressData {
  provinces: Province[];
  cityMap: Record<string, City[]>;
  districtMap: Record<string, District[]>;
}

/**
 * Geographic location entity
 */
export interface Province {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}

/**
 * Design style definition
 */
export interface DesignStyle {
  code: string;
  name: string;
}

/**
 * Address information
 */
export interface Address {
  neighbor: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
}

/**
 * Basic design attributes
 */
export interface BasicAttributes {
  bedroomNum: number | string;
  livingroomNum: number | string;
  bathroomNum: number | string;
  style: DesignStyle;
  area?: number;
  grossFloorArea?: number;
  grossInternalArea?: number;
}

/**
 * Complete design form data
 */
export interface FormData {
  name: string;
  status: number;
  address: Address;
  basicAttributes: BasicAttributes;
}

/**
 * Project entity
 */
export interface Project {
  id: string;
  name: string;
  status?: number;
}

/**
 * Component state
 */
export interface EzhomeFormState {
  isLoading: boolean;
  checkDesignName: boolean;
  checkDescription: boolean;
  currentDesignNameLength: number;
  nameLengthMessage: string;
  checkAddress: boolean;
  currentAddressLength: number;
  addressLengthMessage: string;
  documentStatus: number;
}

/**
 * Dropdown component props
 */
export interface DropdownProps {
  refname: React.RefObject<any>;
  data: any[];
  title: string;
  name: string;
  classname: string;
  onchanged: (name: string, item: any) => void;
}

/**
 * Form component props
 */
export interface EzhomeFormProps {
  assetid: string;
  documentStatus: number;
  checkDesignInfoValidity?: boolean;
  dropdown: (props: DropdownProps) => React.ReactElement;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}

/**
 * EZ Home Design Form Component
 * 
 * A comprehensive form for creating/editing home designs with:
 * - Design name and privacy settings
 * - Location selection (province/city/district/neighborhood)
 * - Room configuration (bedrooms, living rooms, bathrooms)
 * - Style selection
 * 
 * @example
 *