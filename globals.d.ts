// Next.js에서 기본 지원하지 않는 파일 타입에 대한 모듈 선언
// CSS/SCSS는 Next.js가 자체적으로 처리하므로 별도 선언 불필요

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData
  export default content
}
