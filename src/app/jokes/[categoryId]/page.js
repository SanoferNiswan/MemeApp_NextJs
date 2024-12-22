'use client';

import JokesPage from '../../components/JokesPage';
import { usePathname } from 'next/navigation';

export default function CategoryJokes() {
  const path = usePathname();
  const categoryId = path.split('/').pop();

  return <JokesPage categoryId={categoryId} />;
}
