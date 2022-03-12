import { GetStaticPropsContext } from 'next/types'
import Home from '.'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || { slug: '' }
  return {
    props: {
      slug,
    },
    revalidate: 10,
  }
}

export function getPageData() {
  const pageData = [
    {
      identifier: 'roi+rom',
      text: 'ROI + ROM - Top 15',
      slug: 'eyJ0ZXh0IjoiUk9JICsgUk9NIC0gVG9wIDE1IiwicXVlcnlEcmFmdCI6IldJVEggdG9wX3BsYXllcnMgQVMgKFxuICBTRUxFQ1RcbiAgICBwcmludGYoJyVzICVzICglcyknLCBmaXJzdF9uYW1lLCBzZWNvbmRfbmFtZSwgZWxlbWVudF90eXBlKSBBUyBOQU1FLFxuICAgIHRvdGFsX3BvaW50cyxcbiAgICBtaW51dGVzLFxuICAgIG5vd19jb3N0IEFTIHByaWNlXG4gIEZST01cbiAgICBwbGF5ZXJzXG4gIE9SREVSIEJZXG4gICAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgSU5URUdFUikgREVTQ1xuICBMSU1JVFxuICAgIDE1XG4pXG5TRUxFQ1RcbiAgTkFNRSxcbiAgdG90YWxfcG9pbnRzLFxuICBwcmljZSxcbiAgbWludXRlcyxcbiAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgRkxPQVQpIC8gQ0FTVChwcmljZSBBUyBGTE9BVCkgQVMgcm9pLFxuICBDQVNUKHRvdGFsX3BvaW50cyBBUyBGTE9BVCkgLyBDQVNUKG1pbnV0ZXMgQVMgRkxPQVQpIEFTIHJvbSxcbiAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgRkxPQVQpIC8gQ0FTVChwcmljZSBBUyBGTE9BVCkgKyBDQVNUKHRvdGFsX3BvaW50cyBBUyBGTE9BVCkgLyBDQVNUKG1pbnV0ZXMgQVMgRkxPQVQpIEFTIHJvc3RhclxuRlJPTVxuICB0b3BfcGxheWVyc1xuT1JERVIgQllcbiAgcm9zdGFyIERFU0MsXG4gIENBU1QodG90YWxfcG9pbnRzIEFTIElOVEVHRVIpIERFU0M7In0=',
    },
    {
      identifier: 'roi',
      text: 'ROI - Top 15',
      slug: 'eyJ0ZXh0IjoiUk9JIC0gVG9wIDE1IiwicXVlcnlEcmFmdCI6IldJVEggdG9wX3BsYXllcnMgQVMgKFxuICBTRUxFQ1RcbiAgICBwcmludGYoJyVzICVzICglcyknLCBmaXJzdF9uYW1lLCBzZWNvbmRfbmFtZSwgZWxlbWVudF90eXBlKSBBUyBOQU1FLFxuICAgIHRvdGFsX3BvaW50cyxcbiAgICBtaW51dGVzLFxuICAgIG5vd19jb3N0IEFTIHByaWNlXG4gIEZST01cbiAgICBwbGF5ZXJzXG4gIE9SREVSIEJZXG4gICAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgSU5URUdFUikgREVTQ1xuICBMSU1JVFxuICAgIDE1XG4pXG5TRUxFQ1RcbiAgTkFNRSxcbiAgdG90YWxfcG9pbnRzLFxuICBwcmljZSxcbiAgbWludXRlcyxcbiAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgRkxPQVQpIC8gcHJpY2UgQVMgcm9pXG5GUk9NXG4gIHRvcF9wbGF5ZXJzXG5PUkRFUiBCWVxuICByb2kgREVTQyxcbiAgY2FzdCh0b3RhbF9wb2ludHMgYXMgaW50ZWdlcikgREVTQzsifQ==',
    },
    {
      identifier: 'rom',
      text: 'ROM - Top 15',
      slug: 'eyJ0ZXh0IjoiUk9NIC0gVG9wIDE1IiwicXVlcnlEcmFmdCI6IldJVEggdG9wX3BsYXllcnMgQVMgKFxuICBTRUxFQ1RcbiAgICBwcmludGYoJyVzICVzICglcyknLCBmaXJzdF9uYW1lLCBzZWNvbmRfbmFtZSwgZWxlbWVudF90eXBlKSBBUyBOQU1FLFxuICAgIHRvdGFsX3BvaW50cyxcbiAgICBtaW51dGVzLFxuICAgIG5vd19jb3N0IEFTIHByaWNlXG4gIEZST01cbiAgICBwbGF5ZXJzXG4gIE9SREVSIEJZXG4gICAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgSU5URUdFUikgREVTQ1xuICBMSU1JVFxuICAgIDE1XG4pXG5TRUxFQ1RcbiAgTkFNRSxcbiAgdG90YWxfcG9pbnRzLFxuICBwcmljZSxcbiAgbWludXRlcyxcbiAgQ0FTVCh0b3RhbF9wb2ludHMgQVMgRkxPQVQpIC8gQ0FTVChtaW51dGVzIEFTIEZMT0FUKSBBUyByb21cbkZST01cbiAgdG9wX3BsYXllcnNcbk9SREVSIEJZXG4gIHJvbSBERVNDLFxuICBjYXN0KHRvdGFsX3BvaW50cyBhcyBpbnRlZ2VyKSBERVNDOyJ9',
    },
  ]

  return pageData
}

export function getPageDataParams() {
  const pageData = getPageData()

  return pageData.map((p) => {
    return {
      params: {
        slug: p.slug,
      },
    }
  })
}

export async function getStaticPaths() {
  return {
    paths: getPageDataParams(),
    fallback: true,
  }
}

export default Home
