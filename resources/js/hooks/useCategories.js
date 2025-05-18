import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setLoading, setError } from '@/store/slices/categorySlice';
import categoryService from "@/services/categoryService";

export function useCategories() {
  const dispatch = useDispatch();
  const { items: categories, loading, error } = useSelector(state => state.categories);

  const fetchCategories = async () => {
    dispatch(setLoading(true));
    try {
      const data = await categoryService.getCategories();
      dispatch(setCategories(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
}