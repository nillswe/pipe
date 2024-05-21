export type DeviceType = 'Smartphone' | 'Tablet' | 'Laptop' | 'Computer'

export type Device = {
  id: string
  name: string
  width: number
  height: number
  type: DeviceType
  userAgent: string
}
