package app.hellfade.krontm.shared.configuration;

import app.hellfade.krontm.shared.utility.security.AuthenticationTokenFilter;
import app.hellfade.krontm.shared.utility.security.TokenUtils;
import app.hellfade.krontm.shared.utility.security.UnauthorizedEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Конфигурация WebSecurity
 */
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfiguration {

	private final UnauthorizedEntryPoint handler;
	private final UserDetailsService service;
	private final TokenUtils utilities;
	private final AuthenticationConfiguration configuration;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager() throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(this.service);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public AuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		AuthenticationTokenFilter filter = new AuthenticationTokenFilter(utilities, service);
		filter.setAuthenticationManager(authenticationManager());
		return filter;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.exceptionHandling().authenticationEntryPoint(this.handler).and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http
			.authorizeRequests()
			.antMatchers("/**")
			.permitAll()
			.antMatchers("/auth/**", "/api-docs/**", "/swagger-ui.html", "/swagger-ui/**")
			.permitAll()
			.anyRequest()
			.authenticated();
		http.cors().disable().headers().frameOptions().disable();
		http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> web.ignoring().antMatchers("/images/**", "/js/**", "/webjars/**");
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
					.addMapping("/**")
					.allowedMethods(CorsConfiguration.ALL)
					.allowedHeaders(CorsConfiguration.ALL)
					.allowedOriginPatterns(CorsConfiguration.ALL);
			}
		};
	}
}
