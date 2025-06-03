import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://qxeanzhkdfcmmhktqtzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZWFuemhrZGZjbW1oa3RxdHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Njg1OTcsImV4cCI6MjA2MzU0NDU5N30.dGnvZ4k-0MbC4XpMmin8KMY0DQdhXC6PZDi6dByqDCI' // Replace with your actual anon key

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }