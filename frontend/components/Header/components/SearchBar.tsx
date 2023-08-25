import React, { useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const { page, search } = router.query;
  const currentRoute = router.pathname.replace('[page]', `${page}`);

  useEffect(() => {
    if (!search) resetForm();
  }, [router]);
  
  const onSubmit = () => {
    const correctRoute =
      currentRoute === '/' || currentRoute.startsWith('/community');

    if (correctRoute) {
      if (valuesSearch.trim() === '') {
        router.replace(currentRoute);
      } else {
        router.replace({
          pathname: currentRoute,
          query: { search: valuesSearch },
        });
      }
    }
  };
  const {
    handleChange,
    handleBlur,
    resetForm,
    values: { search: valuesSearch },
    handleSubmit,
  } = useFormik({
    initialValues: {
      search: '',
    },

    onSubmit: () => {
      onSubmit();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-1 h-10 items-center space-x-2 rounded-xl border
  bg-second px-3 py-1 min-w-[165px] xl:max-w-6xl"
    >
      <button type="submit">
        <SearchIcon className="w-5 h-5 text-text-third" />
      </button>
      <input
        className="flex-1 bg-transparent outline-none min-w-[80px]"
        type="text"
        id="search"
        autoComplete="off"
        placeholder="Search Replicaz"
        onChange={handleChange}
        onBlur={handleBlur}
        value={valuesSearch}
      />
    </form>
  );
};

export default SearchBar;
