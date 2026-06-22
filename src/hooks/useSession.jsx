import { useEffect, useState } from 'react';
import storageService from '../services/storage/storageService';

const useSession = () => {
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await storageService.getItem('id_usuario');
        const c = await storageService.getItem('id_carrinho');
        setUserId(u ? JSON.parse(u) : 0);
        setCartId(c ? JSON.parse(c) : 0);
      } catch (err) {
        console.error('useSession load', err);
      }
    };

    load();
  }, []);

  return { userId, cartId, setUserId, setCartId };
};

export default useSession;
