/** App navigation only: GlobalOrderUI opens the drawer then removes this query. */
export const ORDER_DRAWER_OPEN_HREF = '/?open=1' as const;

export function shouldOpenOrderDrawerFromSearchParams(
  params: Pick<URLSearchParams, 'get'>,
): boolean {
  return params.get('open') === '1';
}
