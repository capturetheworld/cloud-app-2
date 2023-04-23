declare global {
  interface Navigator {
    webkitShowPlaybackTargetPicker(): Promise<MediaDeviceInfo>
  }
}
