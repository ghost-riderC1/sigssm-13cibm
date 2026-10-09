import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
// Temporariamente mantemos o fallback do mock caso o banco dele estaja vazio ainda
import { viaturasMock } from '../data/mockData';

export const useViaturas = () => {
    const [viaturas, setViaturas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchViaturas = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('viaturas')
                .select('*')
                .order('prefixo', { ascending: true });

            if (error) throw error;

            // Se não tem nada no banco real ainda, joga o mock, senão usa o banco!
            if (data && data.length > 0) {
                setViaturas(data);
            } else {
                setViaturas(viaturasMock);
            }
        } catch (error) {
            console.error('Erro buscando viaturas:', error.message);
            setViaturas(viaturasMock); // Fallback p/ nao quebrar o layout local
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchViaturas();
    }, []);

    const addViatura = async (viaturaData) => {
        try {
            const { data, error } = await supabase
                .from('viaturas')
                .insert([viaturaData])
                .select();

            if (error) throw error;
            await fetchViaturas(); // Atualiza a lista com o dado novo do banco
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao adicionar:', error.message);
            return { success: false, error };
        }
    };

    const updateViatura = async (id, viaturaData) => {
        try {
            const { data, error } = await supabase
                .from('viaturas')
                .update(viaturaData)
                .eq('id', id)
                .select();

            if (error) throw error;
            await fetchViaturas();
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao atualizar:', error.message);
            return { success: false, error };
        }
    };

    return {
        viaturas,
        loading,
        addViatura,
        updateViatura,
        refreshData: fetchViaturas
    };
};
