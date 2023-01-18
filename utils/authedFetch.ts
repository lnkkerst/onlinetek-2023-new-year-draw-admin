/// @ts-expect-error i don't know why it doesn't work :(
export const authedFetch: typeof $fetch = (request, opts = {}) => {
  opts.headers = opts.headers ?? {};
  (opts.headers as any).Authorization = useCookie('token').value;
  return $fetch(request, opts);
};
